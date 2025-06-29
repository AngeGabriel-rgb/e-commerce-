"use client"

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryId?: string;
  image?: string;
  inStock: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  product?: Product;
}

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis'),
  description: Yup.string().required('La description est requise'),
  price: Yup.number().positive('Le prix doit être positif').required('Le prix est requis'),
  categoryId: Yup.string().required('La catégorie est requise'),
  image: Yup.string().url('L\'URL de l\'image doit être valide'),
  inStock: Yup.boolean(),
});

export default function ProductForm({ categories, product }: ProductFormProps) {
  const initialValues = {
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    categoryId: product?.categoryId || '',
    image: product?.image || '',
    inStock: product?.inStock ?? true,
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const method = product ? 'PUT' : 'POST';
      const url = product ? `/api/products/${product.id}` : '/api/products';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde du produit');
      }

      // Rediriger vers la liste des produits
      window.location.href = '/admin/produits';
      
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Formik
        initialValues={initialValues}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nom du produit
              </label>
              <Field name="name">
                {({ field }: any) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nom du produit"
                    className={errors.name && touched.name ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                rows={4}
                placeholder="Description du produit"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description && touched.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm mt-1">{errors.description}</div>
              )}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Prix (€)
              </label>
              <Field name="price">
                {({ field }: any) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="Prix"
                    className={errors.price && touched.price ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.price && touched.price && (
                <div className="text-red-500 text-sm mt-1">{errors.price}</div>
              )}
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium mb-2">
                Catégorie
              </label>
              <Field
                name="categoryId"
                as="select"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.categoryId && touched.categoryId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              {errors.categoryId && touched.categoryId && (
                <div className="text-red-500 text-sm mt-1">{errors.categoryId}</div>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2">
                URL de l'image (optionnel)
              </label>
              <Field name="image">
                {({ field }: any) => (
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://exemple.com/image.jpg"
                    className={errors.image && touched.image ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.image && touched.image && (
                <div className="text-red-500 text-sm mt-1">{errors.image}</div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Field name="inStock">
                {({ field }: any) => (
                  <input
                    {...field}
                    type="checkbox"
                    id="inStock"
                    checked={values.inStock}
                    onChange={(e) => setFieldValue('inStock', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                )}
              </Field>
              <label htmlFor="inStock" className="text-sm font-medium">
                En stock
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Enregistrement...' : product ? 'Mettre à jour' : 'Créer'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Annuler
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}