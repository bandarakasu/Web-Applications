   # dist folder එක zip කරන්න
   ```

2. **Netlify වෙත යන්න:** [netlify.com](https://netlify.com)

3. **Sign up/Login කරන්න**

4. **"Sites" → "Add new site" → "Deploy manually"**

5. **dist.zip file එක drag & drop කරන්න**

#### Method 2: Git Integration (Professional) 🚀

1. **GitHub වෙත push කරන්න:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Netlify වෙත යන්න**

3. **"Add new site" → "Import an existing project"**

4. **GitHub connect කරන්න**

5. **Repository select කරන්න**

6. **Build settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

7. **"Deploy site" click කරන්න**

### 8️⃣ **Environment Variables (Optional)**
