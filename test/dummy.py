
import unittest
from selenium import webdriver

PATH = "chromedriver.exe"
driver = webdriver.Chrome(PATH)

driver.get("www.crimestats.me")
