from html.parser import HTMLParser
from html import escape
from pathlib import Path
import json, re

ROOT = Path(__file__).resolve().parents[1]
class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return ''.join(c if isinstance(c, str) else c.text() for c in self.children)
    def find(self, predicate):
        if predicate(self): return self
        for c in self.children:
            if isinstance(c, Node):
                found = c.find(predicate)
                if found: return found

class Tree(HTMLParser):
    void = {'img','br','hr','input','meta','link','source','wbr','area','base','col','embed','param','track'}
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node('root'); self.stack = [self.root]; self.feed(html)
    def handle_starttag(self, tag, attrs):
        n=Node(tag,attrs); self.stack[-1].children.append(n)
        if tag not in self.void: self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:
                self.stack=self.stack[:i]; break
    def handle_data(self, data): self.stack[-1].children.append(data)

images=[]
def markdown(n, note=False):
    if isinstance(n,str):
        return n.replace('\\','\\\\').replace('<','&lt;').replace('>','&gt;').replace('{{','&#123;&#123;')
    tag=n.tag
    if tag in {'script','style'} or 'headerlink' in n.attrs.get('class',''): return ''
    if tag=='img':
        src=n.attrs.get('src','')
        idx=len(images)+1; caption=n.attrs.get('alt') or f'原文插图 {idx:02}'
        images.append({'number':idx,'source':src,'caption':caption})
        return f'\n\n<ArchivedImage src="{escape(src,quote=True)}" caption="{escape(caption,quote=True)}" />\n\n'
    if tag=='figure' and 'highlight' in n.attrs.get('class',''):
        code=n.find(lambda x:x.tag=='td' and x.attrs.get('class')=='code')
        return '\n\n```bash\n'+(code.text().strip() if code else n.text().strip())+'\n```\n\n'
    inner=''.join(markdown(c,note) for c in n.children)
    if re.fullmatch('h[1-6]',tag):
        if note and n.text().startswith('title:'): return ''
        level=min(int(tag[1])+(1 if note else 0),6)
        return '\n\n'+'#'*level+' '+inner.strip()+'\n\n'
    if tag in {'p','div','section'}:
        if note and re.fullmatch(r'\s*2022/10/19 9:27:00\s*',n.text()): return ''
        # The original Hexo page rendered these headings as plain paragraphs.
        if note and re.match(r'^#{1,6}\S',n.text()):
            match=re.match(r'^(#{1,6})(.*)',n.text())
            return '\n\n'+'#'*min(len(match[1])+1,6)+' '+match[2].strip()+'\n\n'
        return '\n\n'+inner.strip()+'\n\n'
    if tag=='br': return '  \n'
    if tag=='hr': return '\n\n---\n\n'
    if tag in {'strong','b'}: return '**'+inner.strip()+'**'
    if tag in {'em','i'}: return '*'+inner.strip()+'*'
    if tag=='blockquote': return '\n\n'+'\n'.join('> '+line if line else '>' for line in inner.strip().splitlines())+'\n\n'
    if tag=='a':
        href=n.attrs.get('href','')
        return f'[{inner.strip()}](<{href}>)' if href else inner
    if tag=='code': return '`'+n.text().strip()+'`'
    if tag=='pre': return '\n\n```text\n'+n.text().strip()+'\n```\n\n'
    if tag=='li': return '\n- '+inner.strip()+'\n'
    if tag in {'ul','ol'}: return '\n\n'+inner.strip()+'\n\n'
    return inner

articles=[
 ('note','模拟电子技术基础笔记（一）','2022-10-27','学习笔记','模拟信号、半导体、PN 结与二极管：模拟电子技术基础的学习记录。','2022/10/27/模拟电子技术基础笔记（一）/index.md'),
 ('hello','Hello World','2022-10-18','建站记录','保留自旧博客的第一篇文章，记录 Hexo 的入门与常用命令。','2022/10/18/hello-world/index.md')
]
report=[]
for key,title,date,category,description,dest in articles:
    raw=(ROOT/'migration/original'/f'{key}.html').read_text(encoding='utf-8-sig')
    tree=Tree(raw)
    article=tree.root.find(lambda n:'article-entry' in n.attrs.get('class','').split())
    if not article: raise ValueError('Article body missing: '+key)
    before=len(images)
    text=markdown(article,note=key=='note')
    text=re.sub(r'\n{3,}','\n\n',text).strip()
    text=re.sub(r'^---\s*','',text).strip()
    meta={'title':title,'date':date,'category':category,'post':True,'description':description,'outline':'deep'}
    front='---\n'+'\n'.join(k+': '+json.dumps(v,ensure_ascii=False) for k,v in meta.items())+'\n---\n\n'
    output=front+'# '+title+'\n\n<PostMeta />\n\n'+text+'\n'
    path=ROOT/'docs'/dest; path.parent.mkdir(parents=True,exist_ok=True); path.write_text(output,encoding='utf-8')
    source_text=article.text()
    report.append({'title':title,'source':f'migration/original/{key}.html','target':f'docs/{dest}','originalBodyTextLength':len(source_text),'imageCount':len(images)-before})
(ROOT/'migration/images.json').write_text(json.dumps(images,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'migration/articles.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
