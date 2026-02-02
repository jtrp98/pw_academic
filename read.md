# setup

npm init playwright@latest
npm i -D cross-env
npm install dotenv
npm install csv-parse

# codegen

npx playwright codegen --browser chromium --viewport-size="1920,1080" "https://academic.schoolbright.co//BypassSuperAdmin.aspx?q="

# run 

npx cross-env MODE=prod SCHOOL_ID=849 playwright test tests/courseManagement
