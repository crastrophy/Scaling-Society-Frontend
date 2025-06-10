import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "../components/ui/card";

export default function PrimitivesDocs() {
  return (
    <div className="max-w-2xl mx-auto py-12 space-y-12">
      <h1 className="text-3xl font-bold mb-8">UI Primitives</h1>

      {/* Button */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Button</h2>
        <p className="mb-4">A versatile button component with variants and sizes.</p>
        <div className="flex gap-4 mb-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        <pre className="bg-[#232533] text-[#F3F4F6] p-4 rounded-lg text-sm overflow-x-auto">
{`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`}
        </pre>
        <h3 className="font-semibold mt-4 mb-2">Props</h3>
        <ul className="list-disc ml-6 text-sm">
          <li><b>variant</b>: "primary" | "secondary" | "ghost"</li>
          <li><b>size</b>: "sm" | "md" | "lg"</li>
          <li><b>loading</b>: boolean</li>
          <li><b>disabled</b>: boolean</li>
          <li>...all native button props</li>
        </ul>
      </section>

      {/* Input */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Input</h2>
        <p className="mb-4">A styled input field for forms.</p>
        <div className="flex gap-4 mb-4">
          <Input placeholder="Default" />
          <Input error placeholder="Error" />
          <Input disabled placeholder="Disabled" />
        </div>
        <pre className="bg-[#232533] text-[#F3F4F6] p-4 rounded-lg text-sm overflow-x-auto">
{`<Input placeholder="Default" />
<Input error placeholder="Error" />
<Input disabled placeholder="Disabled" />`}
        </pre>
        <h3 className="font-semibold mt-4 mb-2">Props</h3>
        <ul className="list-disc ml-6 text-sm">
          <li><b>error</b>: boolean</li>
          <li><b>disabled</b>: boolean</li>
          <li>...all native input props</li>
        </ul>
      </section>

      {/* Card */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Card</h2>
        <p className="mb-4">A flexible card container with header, content, and footer slots.</p>
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
        <pre className="bg-[#232533] text-[#F3F4F6] p-4 rounded-lg text-sm overflow-x-auto mt-4">
{`<Card>
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
</Card>`}
        </pre>
        <h3 className="font-semibold mt-4 mb-2">Slots</h3>
        <ul className="list-disc ml-6 text-sm">
          <li><b>CardHeader</b></li>
          <li><b>CardTitle</b></li>
          <li><b>CardDescription</b></li>
          <li><b>CardContent</b></li>
          <li><b>CardFooter</b></li>
        </ul>
      </section>
    </div>
  );
} 