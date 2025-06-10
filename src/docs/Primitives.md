# UI Primitives

A reference for your core design system components: **Button**, **Input**, and **Card**.

---

## Button
A versatile button component with variants and sizes.

### Usage
```jsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
```

### Props
| Prop      | Type                                 | Description                       |
|-----------|--------------------------------------|-----------------------------------|
| variant   | "primary" \| "secondary" \| "ghost" | Visual style of the button        |
| size      | "sm" \| "md" \| "lg"                | Button size                       |
| loading   | boolean                              | Shows a loading spinner           |
| disabled  | boolean                              | Disables the button               |
| ...props  | All native button props              | Standard button attributes        |

---

## Input
A styled input field for forms.

### Usage
```jsx
<Input placeholder="Default" />
<Input error placeholder="Error" />
<Input disabled placeholder="Disabled" />
```

### Props
| Prop      | Type           | Description                |
|-----------|----------------|----------------------------|
| error     | boolean        | Shows error styling        |
| disabled  | boolean        | Disables the input         |
| ...props  | All native input props | Standard input attributes |

---

## Card
A flexible card container with header, content, and footer slots.

### Usage
```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the card content area.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>
```

### Slots
- **CardHeader**
- **CardTitle**
- **CardDescription**
- **CardContent**
- **CardFooter**

---

Expand this page as you add more primitives or patterns to your design system! 