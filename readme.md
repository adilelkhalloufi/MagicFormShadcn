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
    group: "User Information",
    fields: [
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
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
        ],
        placeholder: "Select gender",
      },
    ],
    layout: { type: "vertical" },
    position: { row: 1, column: 1, width: "full" },
    card: true,
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
/>;
```

## Props

### `fields` (required)

An array of objects defining the form groups and fields.

#### MagicFormGroupProps

| Property | Type                                                                              | Description                                                |
| -------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| group    | string                                                                            | Group name/title                                           |
| fields   | MagicFormFieldProps[]                                                             | Array of field definitions                                 |
| layout   | { type: "horizontal" \| "vertical" \| "grid"; columns?: 1 \| 2 \| 3 \| 4 }        | Layout type and optional number of columns for grid layout |
| position | { row: number; column: number; width?: "full" \| "half" \| "third" \| "quarter" } | Positioning of the group within the form                   |
| card     | boolean                                                                           | Whether to wrap the group in a card component              |

#### MagicFormFieldProps

| Property     | Type                                                                                                  | Description                            |
| ------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------- |
| name         | string                                                                                                | Field name (unique key)                |
| label        | string                                                                                                | Displayed label (optional)             |
| error        | string                                                                                                | Custom error message (optional)        |
| value        | any                                                                                                   | Initial value (optional)               |
| type         | "checkbox" \| "select" \| "text" \| "textarea" \| "radio" \| "image" \| "number" \| "date" \| "table" | Field type                             |
| required     | boolean                                                                                               | Defines if the field is required       |
| order        | number                                                                                                | Order of the field within the group    |
| options      | MagicFormOptionProps[]                                                                                | Options list for select fields         |
| placeholder  | string                                                                                                | Placeholder text for the field         |
| autocomplete | boolean                                                                                               | Enables autocomplete for select fields |
| width        | "full" \| "half" \| "third" \| "auto"                                                                 | Width of the field                     |
| columns      | MagicFormFieldProps[]                                                                                 | Column definitions for table fields    |
| disabled     | boolean                                                                                               | Disables the field                     |

#### MagicFormOptionProps

| Property | Type   | Description         |
| -------- | ------ | ------------------- |
| value    | any    | Option value        |
| name     | string | Option display name |

### `onSubmit` (required)

Function called on form submission, receiving the data as an object.

### `title` (optional)

Form title (default: "Form").

### `button` (optional)

Submit button text (default: "Submit").

### `initialValues` (optional)

Initial values for the form fields.

### `loading` (optional)

Boolean indicating if the form is in a loading state.

### `modal` (optional)

Boolean indicating if the form should be displayed in a modal.

### `onClose` (optional)

Function called when the modal is closed.

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
