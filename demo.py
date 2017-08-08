import urllib.request
import json

results_page = 'https://public.rts.iebc.or.ke/enr/index.html#/Kenya_Elections_Presidential/1'

#page = urllib.request.urlopen(results_page)

#soup = BeautifulSoup(page, 'html.parser')

#print(soup.body.prettify())

#name_box = soup.find('div', attrs={'class': 'fwb w-100 ng-binding'})

#print(name_box)

#name = name_box.text.strip()

#print(name)

## WORK NOW WITH RAW jSON

# 1. Get COunties data, two json files
counties_list_one = 'https://public.rts.iebc.or.ke/jsons/round1/config/Kenya_Elections_Presidential/Level_2.json'
# counties_list_two = 'https://public.rts.iebc.or.ke/jsons/round1/config/Kenya_Elections_Presidential/Level_3.json'

counties_page_one = urllib.request.urlopen(counties_list_one).read()
# counties_page_two = urllib.request.urlopen(counties_list_two).read() #### NOT NEEDED, FULL LIST IN ELEMENT ONE

dataOne = json.loads(counties_page_one)
# dataTwo = json.loads(counties_page_two)


with open('first_list', 'w') as outfile:
	json.dump(dataOne, outfile, ensure_ascii=False, indent=4)

## read counties data
for item in dataOne:
	county_index = str(item[0])
	countyName = item[1];

	strOne = 'https://public.rts.iebc.or.ke/jsons/round1/results/Kenya_Elections_Presidential%2F1%2F'
	strTwo = '/info.json'
	countyElectionLink =  strOne + county_index +strTwo

	# read data from individual pages
	countyPage = urllib.request.urlopen(countyElectionLink).read()
	countyData = json.loads(countyPage)
	
	if (countyName == 'ELGEYO/MARAKWET'):
		countyName = 'ELGEYO - MARAKWET'

	with open(countyName+ '.json', 'w') as outputFileData:
		json.dump(countyData, outputFileData, ensure_ascii=False, indent=4)


#election_info = 'https://public.rts.iebc.or.ke/jsons/round1/results/Kenya_Elections_Presidential%2F1%2F1030/info.json';

#page = urllib.request.urlopen(election_info).read()

#data = json.loads(page)

#print(data)


