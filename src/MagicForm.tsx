import React, { useState } from 'react';
 


export interface MagicFormOptionProps {
    value: string;
    label: string;
}

export interface MagicFormFields {
    name: string;
    label?: string;
    error?: string;
    type: "checkbox" | "select" | "text" | "textarea" | "radio" | "image" | "number";
    required?: boolean;
    order?: number;
    options?: MagicFormOptionProps[];
    optionPlaceHolder?: string;
    group?: number;
    groupTitle?: string;
}

interface MagicFormProps {
    fields: MagicFormFields[];
    onSubmit: (data: any) => void;
    title?: string;
    button?: string;
    layout?: "row" | "column" | "grid-2";
}

const MagicForm = ({ fields, onSubmit, title = "Form", button = "Submit", layout = "column" }: MagicFormProps) => {
    const [formData, setFormData] = useState<any>(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === "image" ? null : "" }), {})
    );
    const [imagePreviews, setImagePreviews] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: any, field: any) => {
        if (e.target.type === "file") {
            const file = e.target.files[0];
            if (file) {
                setFormData({ ...formData, [field]: file });
                setImagePreviews({ ...imagePreviews, [field]: URL.createObjectURL(file) });
            }
        } else {
            setFormData({ ...formData, [field]: e.target.value });
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
        <div>
            <h1 className='m-2 text-3xl font-bold'>{title}</h1>
            <div className={
                layout === "grid-2" ? "grid grid-cols-2 gap-4" :
                    layout === "row" ? "flex flex-wrap gap-4" : "flex flex-col gap-4"
            }>
                {Object.entries(groupedFields).map(([group, { title, fields: groupFields }]) => (
                    <Card key={group} className="p-4 mb-4 w-full">
                        <CardContent>
                            {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
                            <div className="grid grid-cols-1   gap-4">
                                {groupFields.map(({ name, label, type, options, optionPlaceHolder = "Select" }: MagicFormFields) => (
                                    <div key={name} className="mb-4">
                                        <Label>{label}</Label>
                                        {type === "select" ? (
                                            <Select onValueChange={(value) => handleChange({ target: { value } }, name)}>
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
                                                value={formData[name]}
                                                onChange={(e) => handleChange(e, name)}
                                                className={errors[name] ? "border-red-500" : ""}
                                            />
                                        ) : (
                                            <Input
                                                type="text"
                                                value={formData[name]}
                                                onChange={(e) => handleChange(e, name)}
                                                className={errors[name] ? "border-red-500" : ""}
                                            />
                                        )}
                                        {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mb-4 flex justify-end">
                <Button onClick={handleSubmit}>{button}</Button>
            </div>
        </div>
    );
};

export default MagicForm;