# MagicForm shadcn ui

MagicForm is a dynamic React component that allows easy generation of configurable forms. It supports various field types and offers validation options.

## Installation

You can install this package via npm or yarn:

```sh
npm install magic-form
# or
yarn add magic-form
```

## Usage

### Importation

```tsx
import MagicForm from "magic-form";
```

### Example Usage

```tsx
const fields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: true,
  },
  {
    name: "profile_picture",
    label: "Profile Picture",
    type: "image",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    optionPlaceHolder: "Select gender",
  },
];

const handleSubmit = (data) => {
  console.log("Form Data:", data);
};

<MagicForm
  fields={fields}
  onSubmit={handleSubmit}
  title="Registration Form"
  button="Submit"
  layout="column"
/>;
```

## Props

### `fields` (required)

An array of objects defining the form fields.

| Property          | Type                                                                             | Description                         |
| ----------------- | -------------------------------------------------------------------------------- | ----------------------------------- |
| name              | string                                                                           | Field name (unique key)             |
| label             | string                                                                           | Displayed label (optional)          |
| type              | "checkbox" \| "select" \| "text" \| "textarea" \| "radio" \| "image" \| "number" | Field type                          |
| required          | boolean                                                                          | Defines if the field is required    |
| options           | Array<{ label: string, value: string }>                                          | Options list for select fields      |
| optionPlaceHolder | string                                                                           | Placeholder text for a select field |
| group             | number                                                                           | Field group (optional)              |
| groupTitle        | string                                                                           | Group title (optional)              |

### `onSubmit` (required)

Function called on form submission, receiving the data as an object.

### `title` (optional)

Form title (default: "Form").

### `button` (optional)

Submit button text (default: "Submit").

### `layout` (optional)

Defines the field display layout:

- `column` (default): Column display
- `row`: Row display
- `grid-2`: 2-column grid display

## Features

✅ Dynamic field generation
✅ Supports text, number, image, select, checkbox, radio, and textarea fields
✅ Error handling and required field validation
✅ Image preview for uploaded files
✅ Field grouping capability

## ShadCN UI Integration

MagicForm leverages [ShadCN UI](https://ui.shadcn.com/) components to provide a modern, customizable, and accessible user interface. ShadCN UI is a collection of beautifully styled and reusable UI components built on top of Radix UI and Tailwind CSS.

### Why Use ShadCN UI?

- 🖌 **Modern & Customizable**: Components are easily themeable and customizable.
- 🚀 **Performance Optimized**: Lightweight and fast.
- 🎨 **Beautiful UI**: Clean and minimal design.
- ♿ **Accessible**: Follows best practices for accessibility.

### Components Used in MagicForm

- `Button` - Used for form submission.
- `Input` - Handles text, number, and image file inputs.
- `Label` - Displays field labels.
- `Card` & `CardContent` - Groups and styles form sections.
- `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` - Implements dropdown selection fields.

To learn more about ShadCN UI, visit their [official documentation](https://ui.shadcn.com/).

## Contributing

If you would like to contribute to this package, feel free to submit a pull request or open an issue on GitHub. Any help in improving the package, fixing bugs, or adding new features is highly appreciated!

## License

This project is licensed under the MIT License.
