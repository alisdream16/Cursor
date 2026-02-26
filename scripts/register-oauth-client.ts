// SocialSeller OAuth Client Kayıt Script'i
// Çalıştırmak için: npx ts-node scripts/register-oauth-client.ts

import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function registerSocialSellerClient() {
  console.log('🔐 SocialSeller OAuth Client kaydediliyor...\n')

  // Generate credentials
  const clientId = crypto.randomBytes(16).toString('hex')
  const clientSecretPlain = crypto.randomBytes(32).toString('hex')
  const clientSecretHashed = await bcrypt.hash(clientSecretPlain, 10)

  // Create OAuth client
  const client = await prisma.oAuthClient.create({
    data: {
      name: 'SocialSeller',
      clientId,
      clientSecret: clientSecretHashed,
      redirectUris: [
        'https://ebay-telegram-bot-production.up.railway.app/api/auth/hirenup/callback',
        'http://localhost:3000/api/auth/hirenup/callback' // Development için
      ],
      scopes: ['openid', 'profile', 'email'],
      grants: ['authorization_code', 'refresh_token'],
      isActive: true
    }
  })

  console.log('✅ OAuth Client başarıyla oluşturuldu!\n')
  console.log('=' .repeat(60))
  console.log('📋 SocialSeller Environment Variables:')
  console.log('=' .repeat(60))
  console.log(`\nHIRENUP_CLIENT_ID=${clientId}`)
  console.log(`HIRENUP_CLIENT_SECRET=${clientSecretPlain}`)
  console.log(`NEXT_PUBLIC_HIRENUP_URL=https://www.hirenup.com`)
  console.log(`NEXT_PUBLIC_APP_URL=https://ebay-telegram-bot-production.up.railway.app`)
  console.log('\n' + '=' .repeat(60))
  console.log('⚠️  ÖNEMLİ: clientSecret sadece bir kez gösterilir!')
  console.log('⚠️  Bu değerleri hemen kaydedin!')
  console.log('=' .repeat(60))

  await prisma.$disconnect()
}

registerSocialSellerClient()
  .catch(async (e) => {
    console.error('❌ Hata:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
