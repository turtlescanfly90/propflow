const fs = require("fs");

const config = {
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
};

fs.writeFileSync(
  "auth-config.generated.js",
  `window.PropFlowAuthConfig = ${JSON.stringify(config, null, 2)};\n`,
);

console.log(
  config.supabaseUrl && config.supabaseAnonKey
    ? "Generated Supabase auth config."
    : "Generated empty auth config. Add SUPABASE_URL and SUPABASE_ANON_KEY in Vercel, then redeploy.",
);
