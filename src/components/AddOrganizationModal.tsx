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
import { SelectField } from '@/components/forms/FormField'
import { LoadingButton } from '@/components/ui/loading'
import { Plus, Globe, Building, Mail } from 'lucide-react'
import { createOrganizationSchema, CreateOrganizationInput } from '@/lib/validations'
import { useOrganizationsStore } from '@/stores/organizationsStore'
import { useUIStore } from '@/stores/uiStore'
import { showSuccessToast, showErrorToast } from '@/components/ui/toast'

interface AddOrganizationModalProps {
  children?: React.ReactNode
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
]

export function AddOrganizationModal({ children }: AddOrganizationModalProps) {
  const [open, setOpen] = useState(false)
  const { createOrganization, isLoading } = useOrganizationsStore()
  const { setModalOpen } = useUIStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateOrganizationInput>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      website: '',
      sopEmail: '',
      status: 'active'
    }
  })

  const onSubmit = async (data: CreateOrganizationInput) => {
    try {
      await createOrganization({
        name: data.name,
        website: data.website,
        sopEmail: data.sopEmail,
        status: data.status,
        totalLearners: 0,
        totalCourses: 0
      })

      showSuccessToast(
        'Organization Added',
        'The organization has been successfully added to the system.'
      )

      reset()
      setOpen(false)
      setModalOpen('addOrganization', false)
    } catch (error) {
      console.error('Error adding organization:', error)
      showErrorToast(
        'Error Adding Organization',
        'Failed to add the organization. Please try again.'
      )
    }
  }

  const handleClose = () => {
    reset()
    setOpen(false)
    setModalOpen('addOrganization', false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Organization</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Organization</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new organization partner.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <FormField
            name="name"
            label="Organization Name"
            placeholder="Enter organization name"
            required
            register={register}
            error={errors.name}
            description="The name of the organization that will be displayed in the system"
          />

          <FormField
            name="website"
            label="Website URL"
            type="url"
            placeholder="https://example.com"
            required
            register={register}
            error={errors.website}
            description="The official website URL of the organization"
          />

          <FormField
            name="sopEmail"
            label="SOP Email"
            type="email"
            placeholder="sop@example.com"
            required
            register={register}
            error={errors.sopEmail}
            description="The email address for the Single Point of Contact (SOP) for this organization"
          />

          <SelectField
            name="status"
            label="Status"
            options={statusOptions}
            required
            register={register}
            error={errors.status}
            description="The current status of the organization in the system"
          />
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
            loadingText="Adding Organization..."
            onClick={handleSubmit(onSubmit)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Organization</span>
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
