# 🚀 Hızlı Başlangıç - Projeyi Canlıya Alma

## ⚡ Hızlı Adımlar (Özet)

1. **Bağımlılıkları yükle**
2. **Veritabanı hazırla**
3. **Environment dosyası oluştur**
4. **Veritabanını oluştur**
5. **Sunucuyu başlat**

---

## 📝 Detaylı Adımlar

### 1️⃣ Bağımlılıkları Yükle

Terminal'de proje klasöründe:

```bash
npm install
```

⏱️ Bu işlem 2-5 dakika sürebilir.

---

### 2️⃣ Veritabanı Hazırla

**Seçenek A: Ücretsiz Supabase (Önerilen - En Kolay)**

1. https://supabase.com adresine git
2. "Start your project" tıkla
3. GitHub ile giriş yap
4. Yeni proje oluştur
5. **Settings > Database** bölümüne git
6. **Connection string** kopyala (Connection pooling değil, normal connection string)

**Seçenek B: Yerel PostgreSQL**

1. PostgreSQL kur (https://www.postgresql.org/download/)
2. pgAdmin veya terminal ile yeni veritabanı oluştur:
   ```sql
   CREATE DATABASE hirenup;
   ```

---

### 3️⃣ Environment Dosyası Oluştur

Proje klasöründe `.env.local` adında yeni bir dosya oluştur ve şu içeriği ekle:

```env
# Veritabanı (Supabase'den aldığın connection string'i buraya yapıştır)
DATABASE_URL="postgresql://postgres:[ŞİFREN]@db.[PROJE-ID].supabase.co:5432/postgres"

# NextAuth (Gizli anahtar - https://generate-secret.vercel.app/32 adresinden oluştur)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="rastgele-uzun-bir-gizli-anahtar-buraya"

# Google OAuth (Opsiyonel - şimdilik boş bırakabilirsin)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Facebook OAuth (Opsiyonel - şimdilik boş bırakabilirsin)
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""
```

**Önemli:**
- `DATABASE_URL` içindeki `[ŞİFREN]` ve `[PROJE-ID]` kısımlarını Supabase'den aldığın değerlerle değiştir
- `NEXTAUTH_SECRET` için https://generate-secret.vercel.app/32 adresinden yeni bir key oluştur

---

### 4️⃣ Veritabanını Oluştur

Terminal'de:

```bash
# 1. Prisma client oluştur
npm run db:generate

# 2. Veritabanı tablolarını oluştur
npm run db:push
```

✅ Başarılı olduysa "Database synchronized" mesajı göreceksin.

---

### 5️⃣ Sunucuyu Başlat

```bash
npm run dev
```

🎉 Tarayıcıda şu adresi aç: **http://localhost:3000**

---

## 🎯 İlk Kullanım

1. Ana sayfayı görüyorsun ✅
2. "Kayıt Ol" butonuna tıkla
3. OAuth ayarları yoksa:
   - Mock kullanıcı oluştur (geliştirme için)
   - Veya OAuth ayarlarını yap (Google/Facebook)

---

## 🔧 OAuth Ayarları (İsteğe Bağlı)

### Google OAuth:

1. https://console.cloud.google.com/
2. Yeni proje oluştur
3. APIs & Services > Credentials
4. Create Credentials > OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Client ID ve Secret'ı `.env.local` dosyasına ekle

### Facebook OAuth:

1. https://developers.facebook.com/
2. My Apps > Create App
3. Facebook Login ekle
4. Settings > Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/callback/facebook`
5. App ID ve Secret'ı `.env.local` dosyasına ekle

---

## ❓ Sorun mu var?

### Port 3000 kullanılıyor?
```bash
# Farklı port kullan
PORT=3001 npm run dev
```

### Veritabanı hatası?
- `.env.local` dosyasındaki `DATABASE_URL`'i kontrol et
- Supabase'de veritabanının aktif olduğundan emin ol

### Prisma hatası?
```bash
npm run db:generate
npm run db:push
```

### Modül bulunamadı?
```bash
rm -rf node_modules
npm install
```

---

## 📚 Daha Fazla Bilgi

Detaylı kurulum için `KURULUM.md` dosyasına bakabilirsin.

---

<!--  -->## ✅ Başarılı!

Projen çalışıyor! 🎉

Herhangi bir sorun olursa, hata mesajını paylaş, yardımcı olayım.

