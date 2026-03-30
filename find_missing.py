import pandas as pd

df = pd.read_excel('語言對照.xlsx', sheet_name='工作表1')
missing = []
for index, row in df.iterrows():
    val = row['越南文']
    if pd.isna(val) or str(val).strip() == '' or str(val).strip() == 'nan':
        if pd.notna(row['中文']):
            missing.append(row['中文'])

print(f"Missing count: {len(missing)}")
for m in missing:
    print(m)
