"use client"

import type React from "react"
import { Formik, Form, Field, FieldArray } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface Specification {
  name: string
  value: string
}

interface Product {
  id?: string
  name: string
  description: string
  price: number
  imageUrl: string
  categoryId?: string
  specifications: Specification[]
}

interface Category {
  id: string
  name: string
}

interface ProductFormProps {
  product?: Product
  categories?: Category[]
  onSubmit: (values: Product) => Promise<void> | void
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories = [], onSubmit }) => {
  const initialValues: Product = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    imageUrl: product?.imageUrl || "",
    categoryId: product?.categoryId || "",
    specifications: product?.specifications || [{ name: "", value: "" }],
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Le nom doit contenir au moins 2 caractères").required("Le nom est requis"),
    description: Yup.string()
      .min(10, "La description doit contenir au moins 10 caractères")
      .required("La description est requise"),
    price: Yup.number().positive("Le prix doit être positif").required("Le prix est requis"),
    imageUrl: Yup.string().url("URL invalide").required("L'URL de l'image est requise"),
    categoryId: Yup.string().required("La catégorie est requise"),
    specifications: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Le nom de la spécification est requis"),
        value: Yup.string().required("La valeur de la spécification est requise"),
      }),
    ),
  })

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? "Modifier le produit" : "Ajouter un nouveau produit"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ errors, touched, isSubmitting, values }) => (
            <Form className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit</Label>
                  <Field name="name">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="name"
                        placeholder="Entrez le nom du produit"
                        className={errors.name && touched.name ? "border-red-500" : ""}
                      />
                    )}
                  </Field>
                  {touched.name && errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€)</Label>
                  <Field name="price">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className={errors.price && touched.price ? "border-red-500" : ""}
                      />
                    )}
                  </Field>
                  {touched.price && errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Field name="description">
                  {({ field }: any) => (
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Décrivez le produit..."
                      rows={4}
                      className={errors.description && touched.description ? "border-red-500" : ""}
                    />
                  )}
                </Field>
                {touched.description && errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL de l'image</Label>
                  <Field name="imageUrl">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        className={errors.imageUrl && touched.imageUrl ? "border-red-500" : ""}
                      />
                    )}
                  </Field>
                  {touched.imageUrl && errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId">Catégorie</Label>
                  <Field name="categoryId">
                    {({ field }: any) => (
                      <select
                        {...field}
                        id="categoryId"
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          errors.categoryId && touched.categoryId ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                  {touched.categoryId && errors.categoryId && (
                    <p className="text-sm text-red-500">{errors.categoryId}</p>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {values.imageUrl && (
                <div className="space-y-2">
                  <Label>Aperçu de l'image</Label>
                  <div className="border rounded-lg p-4">
                    <img
                      src={values.imageUrl || "/placeholder.svg"}
                      alt="Aperçu du produit"
                      className="max-w-xs h-48 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Specifications */}
              <div className="space-y-4">
                <Label>Spécifications</Label>
                <FieldArray name="specifications">
                  {({ push, remove }) => (
                    <div className="space-y-3">
                      {values.specifications.map((_, index) => (
                        <div key={index} className="flex gap-3 items-end">
                          <div className="flex-1">
                            <Label htmlFor={`specifications.${index}.name`}>Nom de la spécification</Label>
                            <Field name={`specifications.${index}.name`}>
                              {({ field }: any) => <Input {...field} placeholder="ex: Couleur, Taille..." />}
                            </Field>
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`specifications.${index}.value`}>Valeur</Label>
                            <Field name={`specifications.${index}.value`}>
                              {({ field }: any) => <Input {...field} placeholder="ex: Rouge, XL..." />}
                            </Field>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={values.specifications.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => push({ name: "", value: "" })}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une spécification
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enregistrement..." : product ? "Mettre à jour" : "Créer le produit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default ProductForm
