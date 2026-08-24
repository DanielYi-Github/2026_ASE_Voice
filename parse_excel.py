import pandas as pd
import json

df = pd.read_excel('語言對照.xlsx', sheet_name='工作表1')
data = df.to_dict('records')
print(json.dumps(data, ensure_ascii=False, indent=2))
