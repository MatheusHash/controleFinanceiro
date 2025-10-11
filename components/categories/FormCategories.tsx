"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { FormCategoriesInterface } from "@/utils/interfaces/CategoriesInterface";

export function FormCategories(props: FormCategoriesInterface) {
  if (props.action_type == "update")
    return (
      <Form>
        <Label>
          <Input />
        </Label>
        <Button>
          Criar categoria <PlusIcon size={12} />
        </Button>
      </Form>
    );

  if (props.action_type == "create")
    return (
      <Form>
        <Label>
          <Input />
        </Label>
        <Button>
          Criar categoria <PlusIcon size={12} />
        </Button>
      </Form>
    );
}
