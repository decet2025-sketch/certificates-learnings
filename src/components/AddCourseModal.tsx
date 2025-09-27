'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/forms/FormField'
import { LoadingButton } from '@/components/ui/loading'
import { Plus, Upload, FileText } from 'lucide-react'
import { createCourseSchema, CreateCourseInput } from '@/lib/validations'
import { useCoursesStore } from '@/stores/coursesStore'
import { useUIStore } from '@/stores/uiStore'
import { showSuccessToast, showErrorToast } from '@/components/ui/toast'

interface AddCourseModalProps {
  children?: React.ReactNode
}

export function AddCourseModal({ children }: AddCourseModalProps) {
  const [open, setOpen] = useState(false)
  const { createCourse, isLoading } = useCoursesStore()
  const { setModalOpen } = useUIStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: '',
      courseId: '',
      certificateTemplate: undefined
    }
  })

  const certificateTemplate = watch('certificateTemplate')

  const onSubmit = async (data: CreateCourseInput) => {
    try {
      await createCourse({
        name: data.name,
        courseId: data.courseId,
        certificateTemplate: data.certificateTemplate,
        status: 'active',
        totalLearners: 0,
        completedLearners: 0
      })

      showSuccessToast(
        'Course Added',
        'The course has been successfully added to the system.'
      )

      reset()
      setOpen(false)
      setModalOpen('addCourse', false)
    } catch (error) {
      console.error('Error adding course:', error)
      showErrorToast(
        'Error Adding Course',
        'Failed to add the course. Please try again.'
      )
    }
  }

  const handleClose = () => {
    reset()
    setOpen(false)
    setModalOpen('addCourse', false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Course</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Course</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new course and upload its certificate template.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <FormField
            name="name"
            label="Course Name"
            placeholder="Enter course name"
            required
            register={register}
            error={errors.name}
            description="The name of the course that will be displayed to learners"
          />

          <FormField
            name="courseId"
            label="Course ID"
            placeholder="e.g., REACT-ADV-001"
            required
            register={register}
            error={errors.courseId}
            description="A unique identifier for the course (uppercase letters, numbers, hyphens, and underscores only)"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Certificate Template
              <span className="text-muted-foreground ml-1">(Optional)</span>
            </label>
            <p className="text-sm text-muted-foreground">
              Upload a PDF or image file to use as the certificate template
            </p>
            
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf,image/*"
                {...register('certificateTemplate')}
                className="hidden"
                id="certificate-template"
              />
              <label
                htmlFor="certificate-template"
                className="flex items-center space-x-2 px-4 py-2 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <Upload className="h-4 w-4" />
                <span className="text-sm">Choose File</span>
              </label>
              
              {certificateTemplate && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <FileText className="h-4 w-4" />
                  <span>{certificateTemplate.name}</span>
                </div>
              )}
            </div>
            
            {errors.certificateTemplate && (
              <p className="text-sm text-red-500">
                {errors.certificateTemplate.message}
              </p>
            )}
          </div>
        </form>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            isLoading={isSubmitting || isLoading}
            loadingText="Adding Course..."
            onClick={handleSubmit(onSubmit)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Course</span>
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
