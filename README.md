# 🧩 Section Visibility PCF

A PowerApps Component Framework (PCF) control that dynamically **shows or hides sections** in model-driven forms based on field values, user roles, or custom logic.  
Ideal for improving user experience and keeping forms clean and contextually relevant.

---

## 🚀 Features

- ✅ Show or hide form sections dynamically  
- ⚙️ Supports multiple condition types (field values, boolean, text, option sets)  
- 🔁 Updates in real time as users interact with fields  
- 🔒 Optional role-based visibility  
- 🧠 Lightweight and configurable directly in the form designer  

---

## 🏗️ Installation

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [Power Platform CLI](https://learn.microsoft.com/power-platform/developer/cli/introduction)
- [Microsoft Power Apps environment](https://make.powerapps.com)
- Access to a Dataverse environment with customization permissions

---

### 2. Clone the Repository
```bash```
```git clone https://github.com/<your-org>/section-visibility-pcf.git```
```cd section-visibility-pcf```
### 3. Install Dependencies
npm install```

### 4. Build the PCF Control
npm run build

### 5. Deploy to Your Environment

Use the Power Platform CLI to import the solution:

pac auth create --url https://yourorg.crm.dynamics.com
pac solution import --path ./out/SectionVisibilityControl.zip


Or manually import the solution zip via Power Apps → Solutions → Import.

⚙️ Configuration

Open your Model-driven app form designer.

Add the Section Visibility PCF control to a form (recommended: on a hidden field or placeholder).

Configure the control’s properties:

Target Section Name: Logical name of the section to toggle.

Trigger Field(s): Field(s) whose values control visibility.

Condition Logic: Equals, Not Equals, Contains, etc.

Visible When True: Determines whether the section shows or hides when condition is met.

Save and publish your form.
