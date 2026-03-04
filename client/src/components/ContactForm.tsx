import React, { useState } from 'react';
import { Button } from './Button';
import { submitContact } from '../lib/api';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  global?: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  message: '',
};

export const ContactForm: React.FC = () => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (state: FormState): FormErrors => {
    const newErrors: FormErrors = {};

    if (!state.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!state.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!state.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (state.message.trim().length < 10) {
      newErrors.message = 'Your message should be at least 10 characters long.';
    }

    return newErrors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, global: undefined }));
    setIsSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSuccess(false);

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await submitContact(values);
      setIsSuccess(true);
      setValues(initialState);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send your message.';
      setErrors({ global: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {errors.global ? (
        <p className="rounded-md border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {errors.global}
        </p>
      ) : null}
      {isSuccess ? (
        <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Thank you! Your message has been sent.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            className="block w-full rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name}</p> : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            className="block w-full rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          className="block w-full rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        {errors.message ? <p className="mt-1 text-xs text-red-300">{errors.message}</p> : null}
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-[0.7rem] text-slate-500">
          I will never share your details. Please avoid sending sensitive data like passwords.
        </p>
      </div>
    </form>
  );
};

