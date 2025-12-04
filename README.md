# 🎭 Playwright Cookbook

> A curated collection of Playwright test-automation snippets — covering UI interactions, network manipulations, file uploads/downloads, fixtures, Page Object Models, authentication, multi session, self healing and more.  
> Ideal for quick reference, learning, or prototyping without needing a full-blown project setup.

---

## 🚀 Why this repo exists

If you’re exploring Playwright or working on QA/test-automation tasks, you often need small, focused scripts — for example: handling popups, selecting calendar dates, simulating a slow network, uploading/downloading files, or emulating mobile devices.  
Rather than bundling everything into a big monolithic project, this “cookbook” collects **self-contained, runnable examples** — making it easier to learn, reuse, or adapt for your own projects.

---

## 🧪 What you’ll find

| Category | Example snippet |
|---------|------------------|
| [UI Interactions](./tests/ui-interactions) | Handle Popups, Select Calendar Date, Drag & Drop, dynamic Drop Down, mouse, keyboard, accessibility, search, slider |
| [Network Controls](./tests/network) | API validation, API + UI validation, Mocking, Monitoring, Interception, Slow/Offline Network Test |
| [Authentication](./tests/authentication) | Store Auth, ReUse Auth, Pre Auth, JWT, Auth Pop Up |
| [Self Healing](./tests/self-healing) | Fault Tolerance, Fallback mechanisms  |
| [File Handling](./tests/file-handling) | File Upload, File Download, Upload on Fly, Multi File Upload, Read CSV file  |
| [Multi Session](./tests/multi-session) | New Tab/Window handling  |
| [Data Driven](./tests/data-driven) | Dynamic Data Driven  |
| [Evidence Capture](./tests/evidences) | Compare Screenshots, Pixel Comparision, Logo dimension matches  |
| [Page Object Model](./POM) | Page Object Model Architecture Pattern demo  |
| …and more | Feel free to expand with new scenarios as needed. |

*(Each snippet lives in its own `.spec.ts` file under corresponding folder.)*

---

## 🔧 Getting started

```bash
git clone https://github.com/HussainiMD/playwright-cookbook.git
cd playwright-cookbook
npm install

Run a specific example/test:
npx playwright test path/to/your/example.spec.ts --project=chromium

To run in HEADED mode:
npx playwright test path/to/your/example.spec.ts --project=chromium --headed

TIP: We can specify partial name of test/spec file and playwright runner will do the job
