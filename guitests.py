from selenium import webdriver
from selenium.webdriver.common.by import By
PATH = "/chromedriver"

driver = webdriver.Chrome(PATH)
driver.get("https://www.crimestats.me")

assert driver.title == "Crime Stats"

try:
    driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/nav/div/a[1]").click()
    print("Successfully found Counties tab.")
except:
    print("****FAILED to find Counties tab.****")

try:
    driver.implicitly_wait(10)
    driver.find_element(By.LINK_TEXT, "Autauga County").click()
    print("Successfully found an individual county.")
except:
    print("****FAILED to find an individual county.****")

try:
    driver.implicitly_wait(10)
    driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/nav/div/a[2]").click()
    print("Successfully found Police Departments tab.")
except:
    print("****FAILED to find Police Departments tab.****")

try:
    driver.implicitly_wait(10)
    driver.find_element(By.LINK_TEXT, "Fairbanks Police Department").click()
    print("Successfully found an individual police department.")
except:
    print("****FAILED to find an individual police department.****")

try:
    driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/nav/div/a[3]").click()
    print("Successfully found Crimes tab.")
except:
    print("****FAILED to find Crimes tab.****")

try:
    driver.implicitly_wait(10)
    driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]/table/tbody/tr[1]/td[2]/a").click()
    print("Successfully found an individual crime.")
except:
    print("****FAILED to find an individual crime.****")

try:
    driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/nav/div/a[4]").click()
    print("Successfully found About tab.")
except:
    print("****FAILED to find About tab.****")
          
driver.close()

