import time
import requests
import schedule
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

TARGET_URL = "http://localhost:3000" # Projen açıkken bu URL'yi kontrol edecek
TELEGRAM_TOKEN = "8717398817:AAHQdeFEscgiPrzCwFTTBC2zkVeHlIqKI6I"
CHAT_ID = "1218598281"

def send_telegram(msg):
    try:
        requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage", 
                      data={"chat_id": CHAT_ID, "text": f"🏗️ MİMAR:\n{msg}"})
    except: pass

def check_site():
    print("Mimar Devriyede... 🔍")
    options = Options()
    options.add_argument("--headless")
    
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.get(TARGET_URL)
        time.sleep(3)
        
        title = driver.title
        logs = driver.get_log('browser')
        errors = [l for l in logs if l['level'] == 'SEVERE']
        
        if errors:
            send_telegram(f"⚠️ Hirenup Sıkıntılı!\nBaşlık: {title}\nHatalar: {len(errors)} adet kritik hata var.")
        else:
            send_telegram(f"✅ Hirenup Stabil.\nBaşlık: {title}\nKonsol temiz.")
            
        driver.quit()
    except Exception as e:
        send_telegram(f"❌ Siteye Erişilemiyor!\nHata: {str(e)}")

# İlk kontrolü yap
check_site()

# Her gün 09:00, 15:00 ve 21:00'de kontrol et
schedule.every().day.at("09:00").do(check_site)
schedule.every().day.at("15:00").do(check_site)
schedule.every().day.at("21:00").do(check_site)

print("Mimar Nöbette. (Ctrl+C ile durdurabilirsin).")
while True:
    schedule.run_pending()
    time.sleep(60)