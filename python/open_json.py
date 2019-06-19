import json
file_directory = "data/tree.json"
json_data=open(file_directory).read()

data = json.loads(json_data)
print(data)
for i in range(7):
    data["simulation"][i]["id"] = i
with open("data/simulations.json","wb") as f:
    json.dump(data,f, indent=2)
