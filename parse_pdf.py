import pdfplumber

with pdfplumber.open('2026日月光集團好聲音歌唱比賽簡章(越文 Ver.8)_(Security C).pdf') as pdf:
    for i, page in enumerate(pdf.pages):
        print(page.extract_text())
