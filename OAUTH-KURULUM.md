# Google ve Facebook OAuth Kurulumu

## 1. Google OAuth Kurulumu

### Adım 1: Google Cloud Console
1. https://console.cloud.google.com/ adresine gidin
2. Yeni proje oluşturun veya mevcut projeyi seçin

### Adım 2: OAuth Consent Screen
1. Sol menüden "OAuth consent screen" seçin
2. "External" seçin ve "Create"
3. Uygulama adı: **HireNUp**
4. Destek email: Email adresiniz
5. Developer contact: Email adresiniz
6. Save and Continue

### Adım 3: Credentials
1. Sol menüden "Credentials" seçin
2. "+ CREATE CREDENTIALS" > "OAuth client ID"
3. Application type: **Web application**
4. Name: **HireNUp Web Client**
5. Authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://hirenup.com` (production)
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://hirenup.com/api/auth/callback/google`
7. Create

### Adım 4: Client ID ve Secret
- **Client ID** ve **Client Secret** kopyalayın
- `.env.local` dosyasına ekleyin:
```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## 2. Facebook OAuth Kurulumu

### Adım 1: Facebook Developers
1. https://developers.facebook.com/ adresine gidin
2. "My Apps" > "Create App"
3. App Type: **Consumer**
4. App Name: **HireNUp**

### Adım 2: Facebook Login Ekleme
1. Sol menüden "Add Product"
2. "Facebook Login" > "Set Up"
3. Web seçin

### Adım 3: Settings
1. Facebook Login > Settings
2. Valid OAuth Redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook`
   - `https://hirenup.com/api/auth/callback/facebook`
3. Save Changes

### Adım 4: App Settings
1. Settings > Basic
2. **App ID** ve **App Secret** kopyalayın
3. `.env.local` dosyasına ekleyin:
```
FACEBOOK_CLIENT_ID=your-app-id
FACEBOOK_CLIENT_SECRET=your-app-secret
```

---

## 3. .env.local Dosyası

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=rastgele-gizli-anahtar-32-karakter-min

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# Facebook OAuth  
FACEBOOK_CLIENT_ID=xxx
FACEBOOK_CLIENT_SECRET=xxx
```

---

## 4. Test Etme

1. Terminalde: `npm run dev`
2. http://localhost:3000/auth/signin adresine gidin
3. "Google ile Devam Et" veya "Facebook ile Devam Et" butonlarına tıklayın
4. OAuth akışını test edin

---

## Sorun Giderme

### "redirect_uri_mismatch" Hatası
- Redirect URI'lerin tam olarak eşleştiğinden emin olun
- Trailing slash (`/`) olmamalı

### "invalid_client" Hatası
- Client ID ve Secret'ın doğru olduğundan emin olun
- .env.local dosyasını kaydettiğinizden emin olun
- Sunucuyu yeniden başlatın: `npm run dev`

### Login sonrası "Get Started" döngüsü
- Bu sorun düzeltildi. Sistem şimdi hesap tipi seçildikten sonra dashboard'a yönlendiriyor.
