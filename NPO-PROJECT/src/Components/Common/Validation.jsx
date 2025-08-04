import { useState } from 'react';
export function useFormValidation(initialValues) {
    const [formData, setFormData] = useState(initialValues);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errors = [];

        if ('subject' in formData && !formData.subject)
            errors.push("Моля, изберете тема.");

        if (!formData.firstName.trim())
            errors.push("Моля, въведете вашето име.");

        if (!formData.lastName.trim())
            errors.push("Моля, въведете вашата фамилия.");

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
            errors.push("Моля, въведете валиден имейл адрес.");

        if ('description' in formData && !formData.description.trim())
            errors.push("Моля, въведете съобщение.");

        if ('event' in formData && !formData.event)
            errors.push("Моля, изберете събитие.");

        return errors;
    };

    const handleValidation = async (onValidSubmit) => {
        const errors = validate();
        if (errors.length > 0) return errors;

        setLoading(true);
        try {
            await onValidSubmit();
            return [];
        } catch (err) {
            return ["Възникна грешка. Опитайте отново."];
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        loading,
        handleValidation,
    };
}
