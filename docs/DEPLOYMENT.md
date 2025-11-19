# Deployment Guide for Snapper

This guide will help you deploy Snapper to Vercel and configure Supabase for production use.

## Prerequisites

- GitHub account with the Snapper repository
- Vercel account (free tier available)
- Supabase account (free tier available)

## Step 1: Set Up Supabase

### 1.1 Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in the project details:
   - Name: `snapper-production`
   - Database Password: (generate a strong password)
   - Region: Choose the closest to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (2-3 minutes)

### 1.2 Set Up Database Schema

1. In your Supabase project dashboard, go to the SQL Editor
2. Copy the contents of `docs/database-schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema
5. Verify that the tables `screenshots` and `presets` were created

### 1.3 Create Storage Bucket

1. Go to Storage in the left sidebar
2. Click "New bucket"
3. Configure the bucket:
   - Name: `screenshots`
   - Public bucket: **No** (keep it private)
   - Allowed MIME types: `image/png, image/jpeg, image/webp`
   - Max file size: `10MB`
4. Click "Create bucket"

### 1.4 Configure Storage Policies

1. Click on the `screenshots` bucket
2. Go to "Policies"
3. Add the following policies:

**Policy 1: Allow authenticated users to upload**
```sql
CREATE POLICY "Users can upload their own screenshots"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'screenshots' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Policy 2: Allow authenticated users to read their own files**
```sql
CREATE POLICY "Users can read their own screenshots"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'screenshots' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Policy 3: Allow authenticated users to delete their own files**
```sql
CREATE POLICY "Users can delete their own screenshots"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'screenshots' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### 1.5 Get API Credentials

1. Go to Project Settings (gear icon in sidebar)
2. Go to API section
3. Copy the following values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

Keep these values for the next step.

## Step 2: Deploy to Vercel

### 2.1 Import Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `athadiary21/snapper`
4. Click "Import"

### 2.2 Configure Environment Variables

In the "Configure Project" screen:

1. Expand "Environment Variables"
2. Add the following variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

3. Make sure these are set for all environments (Production, Preview, Development)

### 2.3 Deploy

1. Click "Deploy"
2. Wait for the deployment to complete (2-3 minutes)
3. Once deployed, you'll get a URL like `https://snapper-xxxxx.vercel.app`

### 2.4 Test the Deployment

1. Visit your Vercel URL
2. Try capturing a screenshot
3. Edit and save it to the cloud
4. Check the Gallery to see if it appears
5. Create a preset and verify it's saved

## Step 3: Configure Custom Domain (Optional)

### 3.1 Add Domain in Vercel

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `snapper.yourdomain.com`)
4. Follow the DNS configuration instructions

### 3.2 Update CORS in Supabase

1. Go to your Supabase project
2. Go to Authentication → URL Configuration
3. Add your custom domain to "Site URL"
4. Add your domain to "Redirect URLs"

## Step 4: Enable Authentication (Optional)

If you want to add user authentication:

### 4.1 Enable Email Auth in Supabase

1. Go to Authentication → Providers
2. Enable "Email" provider
3. Configure email templates if needed

### 4.2 Update the Application

You'll need to modify the code to:
- Add login/signup pages
- Replace `demo-user` with actual user IDs from `auth.uid()`
- Add authentication checks to API routes

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Verify the Supabase URL format is correct
- Check build logs in Vercel for specific errors

### Screenshots Don't Upload

- Verify the storage bucket is created and named exactly `screenshots`
- Check that storage policies are configured correctly
- Ensure the Supabase anon key has the correct permissions

### Database Errors

- Verify the SQL schema was executed successfully
- Check that Row Level Security policies are enabled
- Ensure tables have the correct structure

### API Routes Return 500

- Check Vercel function logs for detailed error messages
- Verify environment variables are accessible
- Test API routes locally first with `pnpm dev`

## Monitoring and Maintenance

### Vercel Analytics

1. Go to your project in Vercel
2. Click "Analytics" to view traffic and performance
3. Enable "Web Analytics" for detailed insights

### Supabase Monitoring

1. Go to your Supabase project
2. Check "Database" → "Usage" for storage and API usage
3. Monitor "Logs" for errors and warnings

### Database Backups

Supabase automatically backs up your database daily. To restore:
1. Go to Database → Backups
2. Select a backup point
3. Click "Restore"

## Scaling Considerations

### Free Tier Limits

**Vercel Free Tier:**
- 100 GB bandwidth per month
- 100 hours of serverless function execution
- Unlimited deployments

**Supabase Free Tier:**
- 500 MB database space
- 1 GB file storage
- 2 GB bandwidth

### Upgrading

When you exceed free tier limits:
1. Vercel: Upgrade to Pro ($20/month)
2. Supabase: Upgrade to Pro ($25/month)

## Security Best Practices

1. **Never commit `.env.local`** - Keep credentials secure
2. **Use Row Level Security** - Already configured in schema
3. **Validate user input** - Add input validation to API routes
4. **Rate limiting** - Consider adding rate limiting to prevent abuse
5. **HTTPS only** - Vercel provides this by default
6. **Regular updates** - Keep dependencies updated

## Support

For issues or questions:
- Check the [README](../README.md) for basic setup
- Review Vercel deployment logs
- Check Supabase logs and monitoring
- Open an issue on GitHub

## Next Steps

After successful deployment:
1. Test all features thoroughly
2. Set up monitoring and alerts
3. Configure custom domain
4. Add user authentication
5. Implement analytics
6. Set up error tracking (e.g., Sentry)

Congratulations! Your Snapper application is now live! 🎉
