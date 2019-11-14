from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import WebDriverException

binary = r'your binary'
profileString=[]

profileString.append(r'<your profiles that can be found at about:profiles>')
profileString.append(r'<your profiles that can be found at about:profiles>')

for profiles1 in profileString:
	print("------------------------------\n"+profiles1+"\n")
	options = Options()
	options.set_headless(headless=False)
	options.binary = binary
	user_agent=r'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0'
	options.add_argument(f'user-agent={user_agent}')
	cap = DesiredCapabilities().FIREFOX
	cap["marionette"] = True #optional

	fp = webdriver.FirefoxProfile(profiles1)
	fp.set_preference("general.useragent.override", "[Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H 'Accept-Language: en,en-US;q=0.5]")
	driver = webdriver.Firefox(fp, firefox_options=options,  capabilities=cap, executable_path="geckodriver.exe")



	executor_url = driver.command_executor._url
	session_id = driver.session_id


	print(session_id)
	print(executor_url)
	driver.get("https://tinder.com")
	i=0
	driver.implicitly_wait(10)
	rightSwipe=driver.find_element_by_css_selector('button.button:nth-child(4)')
	while(True):
		try:
			rightSwipe.click()
		except WebDriverException:
			break
	driver.quit()
