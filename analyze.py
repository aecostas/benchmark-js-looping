from pandas import DataFrame, read_csv
import pandas as pd

file = r'results.csv'
df = pd.read_csv(file)

print("Idiomatic: ", df['idiomatic'].mean(), " ", df['idiomatic'].std())
print("Traditional: ", df['traditional'].mean(), " ", df['traditional'].std())
