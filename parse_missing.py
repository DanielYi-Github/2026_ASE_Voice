import pandas as pd

df = pd.read_excel('語言對照.xlsx', sheet_name='工作表1')
missing = df[df['越南文'].isna()]['中文'].dropna().tolist()
for m in missing:
    print(m)
