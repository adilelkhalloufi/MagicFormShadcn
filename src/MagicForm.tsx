import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

export interface MagicFormOptionProps {
    value: any;
    label: string;
}

export interface MagicFormFieldProps {
    name: string;
    label?: string;
    error?: string;
    value?: any;
    type: "checkbox" | "select" | "text" | "textarea" | "radio" | "image" | "number" | "date";
    required?: boolean;
    order?: number;
    options?: MagicFormOptionProps[];
    optionPlaceHolder?: string;
    group?: number;
    groupTitle?: string;
}

interface MagicFormProps {
    fields: MagicFormFieldProps[];
    onSubmit: (data: any) => void;
    title?: string;
    button?: string;
    layout?: "horizontal" | "vertical" | "grid";
    initialValues?: { [key: string]: any };
    loading?: boolean;
    card?: boolean;

}

const MagicForm = ({ fields, onSubmit, title = "Form", button = "Submit", layout = "grid", initialValues, loading, card = true }: MagicFormProps) => {
    const [formData, setFormData] = useState<any>(
        initialValues || fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === "image" ? null : "" }), {})
    );
    const [imagePreviews, setImagePreviews] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (initialValues) {
            const previews: any = {};
            fields.forEach((field) => {
                if (field.type === "image" && initialValues[field.name]) {
                    previews[field.name] = initialValues[field.name];
                }
            });
            setImagePreviews(previews);
        }
    }, [initialValues, fields]);

    useEffect(() => {

        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues, loading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.type === "file") {
            const file = e.target.files?.[0];
            if (file) {
                setFormData((prev: any) => ({ ...prev, [field]: file }));
                setImagePreviews((prev: any) => ({ ...prev, [field]: URL.createObjectURL(file) }));
            }
        } else if (e.target.type === "checkbox") {
            setFormData((prev: any) => ({ ...prev, [field]: e.target.checked }));
        } else {
            setFormData((prev: any) => ({ ...prev, [field]: e.target.value }));
        }
    };

    const validate = () => {
        let newErrors: any = {};
        fields.forEach(({ name, required }) => {
            if (required && !formData[name]) {
                newErrors[name] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSubmit(formData);
        }
    };

    const groupedFields: any = fields.reduce((acc: any, field) => {
        const groupKey: any = field.group || "default";
        if (!acc[groupKey]) {
            acc[groupKey] = { title: field.groupTitle || "", fields: [] };
        }
        if (field.groupTitle) {
            acc[groupKey].title = field.groupTitle;
        }
        acc[groupKey].fields.push(field);
        return acc;
    }, {});

    return (
        <div className="w-full">
            {card ? (
                <Card className="p-4 mb-4 w-full">
                    <CardContent>
                        <h1 className='m-2 text-3xl font-bold'>{title}</h1>
                        <div className={
                            layout === "grid" ? "grid grid-cols-2 gap-4" :
                                layout === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-4"
                        }>
                            {Object.entries(groupedFields).map(([group, { title, fields: groupFields }]) => (
                                <div key={group} className="p-4 mb-4 w-full">
                                    {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
                                    <div className={
                                        layout === "grid" ? "grid grid-cols-2 gap-4" :
                                            layout === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-4"
                                    }>
                                        {groupFields.map(({ name, label, type, options, optionPlaceHolder = "Select" }: MagicFormFieldProps) => (
                                            <div key={name} className="mb-4">
                                                <Label>{label}</Label>
                                                {type === "select" ? (
                                                    <Select
                                                        value={formData[name] ?? ""}
                                                        onValueChange={(value) => handleChange({ target: { value } }, name)}>
                                                        <SelectTrigger className={errors[name] ? "border-red-500" : ""}>
                                                            <SelectValue placeholder={optionPlaceHolder} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {options?.map(({ label, value }: MagicFormOptionProps) => (
                                                                    <SelectItem key={value} value={value}>
                                                                        {label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                ) : type === "image" ? (
                                                    <div>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleChange(e, name)}
                                                            className={errors[name] ? "border-red-500" : ""}
                                                        />
                                                        {imagePreviews[name] && (
                                                            <img src={imagePreviews[name]} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                                                        )}
                                                    </div>
                                                ) : type === "number" ? (
                                                    <Input
                                                        type="number"
                                                        defaultValue={formData[name]}
                                                        onChange={(e) => handleChange(e, name)}
                                                        className={errors[name] ? "border-red-500" : ""}
                                                    />
                                                ) : type === "checkbox" ? (
                                                    <Checkbox
                                                        defaultChecked={!!formData[name]}
                                                        onChange={(e) => handleChange(e, name)}
                                                        className={errors[name] ? "border-red-500" : ""}
                                                    />
                                                ) : type === "date" ? (
                                                    <Input
                                                        type="date"
                                                        defaultValue={formData[name]}
                                                        onChange={(e) => handleChange(e, name)}
                                                        className={errors[name] ? "border-red-500" : ""}
                                                    />
                                                ) : (
                                                    <Input
                                                        type="text"
                                                        defaultValue={formData[name]}
                                                        onChange={(e) => handleChange(e, name)}
                                                        className={errors[name] ? "border-red-500" : ""}
                                                    />
                                                )}
                                                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mb-4 flex justify-end">
                            <Button onClick={handleSubmit}>{button}</Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <h1 className='m-2 text-3xl font-bold'>{title}</h1>
                    <div className={
                        layout === "grid" ? "grid grid-cols-2 gap-4" :
                            layout === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-4"
                    }>
                        {Object.entries(groupedFields).map(([group, { title, fields: groupFields }]) => (
                            <div key={group} className="p-4 mb-4 w-full">
                                {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
                                <div className={
                                    layout === "grid" ? "grid grid-cols-2 gap-4" :
                                        layout === "horizontal" ? "flex flex-wrap gap-4 items-center" : "flex flex-col gap-4"
                                }>
                                    {groupFields.map(({ name, label, type, options, optionPlaceHolder = "Select" }: MagicFormFieldProps) => (
                                        <div key={name} className="mb-4">
                                            <Label>{label}</Label>
                                            {type === "select" ? (
                                                <Select
                                                    value={formData[name] ?? ""}
                                                    onValueChange={(value) => handleChange({ target: { value } }, name)}>
                                                    <SelectTrigger className={errors[name] ? "border-red-500" : ""}>
                                                        <SelectValue placeholder={optionPlaceHolder} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {options?.map(({ label, value }: MagicFormOptionProps) => (
                                                                <SelectItem key={value} value={value}>
                                                                    {label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            ) : type === "image" ? (
                                                <div>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleChange(e, name)}
                                                        className={errors[name] ? "border-red-500" : ""}
                                                    />
                                                    {imagePreviews[name] && (
                                                        <img src={imagePreviews[name]} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                                                    )}
                                                </div>
                                            ) : type === "number" ? (
                                                <Input
                                                    type="number"
                                                    defaultValue={formData[name]}
                                                    onChange={(e) => handleChange(e, name)}
                                                    className={errors[name] ? "border-red-500" : ""}
                                                />
                                            ) : type === "checkbox" ? (
                                                <Checkbox
                                                    defaultChecked={!!formData[name]}
                                                    onChange={(e) => handleChange(e, name)}
                                                    className={errors[name] ? "border-red-500" : ""}
                                                />
                                            ) : type === "date" ? (
                                                <Input
                                                    type="date"
                                                    value={formData[name] ?? ""}
                                                    onChange={(e) => handleChange(e, name)}
                                                    className={errors[name] ? "border-red-500" : ""}
                                                />
                                            ) : (
                                                <Input
                                                    type="text"
                                                    defaultValue={formData[name]}
                                                    onChange={(e) => handleChange(e, name)}
                                                    className={errors[name] ? "border-red-500" : ""}
                                                />
                                            )}
                                            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                                        </div>
                                    ))}
                                    <Button onClick={handleSubmit}>{button}</Button>
                                </div>
                            </div>
                        ))}

                    </div>

                </>
            )}
        </div>
    );
};

export default MagicForm;