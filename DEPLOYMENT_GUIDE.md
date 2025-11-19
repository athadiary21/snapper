# 🚀 Panduan Deployment Snapper ke Vercel

## Status Integrasi

✅ **Database Supabase**: Sudah dikonfigurasi dan siap digunakan
- Project ID: `itzgikdbbgcntpeatduo`
- URL: `https://itzgikdbbgcntpeatduo.supabase.co`
- Database schema: Sudah diterapkan (tables: screenshots, presets)
- Storage bucket: Sudah dibuat (bucket: screenshots)
- RLS Policies: Sudah aktif

✅ **GitHub Repository**: Sudah di-push dengan konfigurasi lengkap
- Repository: `https://github.com/athadiary21/snapper`
- Branch: `main`
- Konfigurasi Vercel: `vercel.json` sudah ada

## Cara Deploy ke Vercel (5 Menit)

### Opsi 1: Deploy via Dashboard Vercel (Recommended)

1. **Buka Vercel Dashboard**
   - Kunjungi: https://vercel.com/new
   - Login dengan akun GitHub Anda

2. **Import Repository**
   - Klik "Continue with GitHub"
   - Pilih repository `athadiary21/snapper`
   - Klik "Import"

3. **Configure Project**
   - **Project Name**: `snapper` (atau nama lain yang Anda inginkan)
   - **Framework Preset**: Next.js (otomatis terdeteksi)
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build` (otomatis dari vercel.json)
   - **Install Command**: `pnpm install` (otomatis dari vercel.json)

4. **Environment Variables**
   
   Tambahkan environment variables berikut:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://itzgikdbbgcntpeatduo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0emdpa2RiYmdjbnRwZWF0ZHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDcyMTgsImV4cCI6MjA3OTEyMzIxOH0.vcyxIOgu441kBK4s-opb4WEIbUEyJQEvSTJ1yEqHbO4
   ```

5. **Deploy**
   - Klik "Deploy"
   - Tunggu 2-3 menit hingga deployment selesai
   - Aplikasi Anda akan live di URL seperti: `https://snapper-xxx.vercel.app`

### Opsi 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy dari direktori project
cd /path/to/snapper
vercel

# Ikuti prompt untuk setup project
# Vercel akan otomatis detect Next.js dan menggunakan konfigurasi dari vercel.json

# Deploy ke production
vercel --prod
```

## Environment Variables yang Dibutuhkan

Berikut adalah environment variables yang sudah dikonfigurasi:

| Variable | Value | Deskripsi |
|----------|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://itzgikdbbgcntpeatduo.supabase.co` | URL Supabase project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Anon key untuk akses public |

**Note**: Environment variables ini sudah ada di `vercel.json`, tapi lebih baik tambahkan juga di Vercel Dashboard untuk security yang lebih baik.

## Verifikasi Deployment

Setelah deployment berhasil, verifikasi dengan:

1. **Cek Homepage**
   - Buka URL deployment Anda
   - Pastikan UI muncul dengan benar

2. **Test Screenshot Capture**
   - Klik tombol "Capture Full Screen" atau "Capture Area"
   - Pastikan screenshot berhasil diambil

3. **Test Editor**
   - Edit screenshot dengan tools yang tersedia
   - Coba ubah background color, padding, shadow, dll

4. **Test Upload** (Memerlukan Authentication)
   - Untuk test upload ke Supabase, Anda perlu setup authentication terlebih dahulu
   - Lihat bagian "Setup Authentication" di bawah

## Setup Authentication (Opsional tapi Recommended)

Untuk menggunakan fitur upload dan gallery, Anda perlu setup Supabase Auth:

1. **Buka Supabase Dashboard**
   - Kunjungi: https://supabase.com/dashboard/project/itzgikdbbgcntpeatduo
   - Masuk ke tab "Authentication"

2. **Enable Auth Providers**
   - Pilih "Providers"
   - Enable provider yang Anda inginkan (Email, Google, GitHub, dll)
   - Untuk Email: Enable "Email" dan "Confirm email" (optional)

3. **Configure Site URL**
   - Masuk ke "URL Configuration"
   - Tambahkan URL Vercel Anda ke "Site URL"
   - Contoh: `https://snapper-xxx.vercel.app`
   - Tambahkan juga ke "Redirect URLs"

4. **Update Kode (Jika Perlu)**
   - Kode sudah siap untuk authentication
   - Anda bisa tambahkan login page jika diperlukan

## Troubleshooting

### Build Failed

**Problem**: Build gagal di Vercel

**Solution**:
```bash
# Test build locally
cd snapper
pnpm install
pnpm build

# Jika ada error, fix dan push ke GitHub
git add .
git commit -m "Fix build errors"
git push
```

### Environment Variables Not Working

**Problem**: Supabase connection error

**Solution**:
1. Pastikan environment variables sudah ditambahkan di Vercel Dashboard
2. Redeploy project: Vercel Dashboard → Deployments → ... → Redeploy

### Storage Upload Failed

**Problem**: Upload screenshot gagal

**Solution**:
1. Cek storage bucket di Supabase Dashboard
2. Pastikan bucket "screenshots" sudah dibuat
3. Cek storage policies sudah diterapkan

### RLS Policy Error

**Problem**: Error "new row violates row-level security policy"

**Solution**:
1. Pastikan user sudah login (authenticated)
2. Cek RLS policies di Supabase Dashboard → Database → Policies
3. Policies sudah diterapkan untuk tables: screenshots, presets

## Monitoring & Logs

### Vercel Logs
- Buka: Vercel Dashboard → Your Project → Deployments → [Latest] → Function Logs
- Lihat real-time logs untuk debugging

### Supabase Logs
- Buka: Supabase Dashboard → Logs
- Filter by service: API, Auth, Storage, Realtime

## Next Steps

Setelah deployment berhasil:

1. ✅ **Custom Domain** (Optional)
   - Vercel Dashboard → Your Project → Settings → Domains
   - Tambahkan custom domain Anda

2. ✅ **Analytics** (Optional)
   - Vercel Dashboard → Your Project → Analytics
   - Enable Vercel Analytics untuk monitoring

3. ✅ **Performance Monitoring**
   - Vercel Dashboard → Your Project → Speed Insights
   - Monitor Core Web Vitals

4. ✅ **Setup CI/CD**
   - Sudah otomatis! Setiap push ke `main` akan trigger deployment baru

## Support

Jika ada masalah:
- Check logs di Vercel Dashboard
- Check database di Supabase Dashboard
- Review dokumentasi di `README.md`
- Check GitHub Issues: https://github.com/athadiary21/snapper/issues

---

**🎉 Selamat! Aplikasi Snapper Anda siap untuk production!**
