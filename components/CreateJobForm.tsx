'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CustomFormField, CustomFormSelect } from './FormComponents';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJobAction } from '@/utils/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';

function CreateJobForm() {
  const { toast, ToastComponent } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          title: "Error",
          description: "There was an error creating the job",
          type: "error"
        });
        return;
      }
      
      toast({
        title: "Success",
        description: "Job created successfully",
        type: "success"
      });
      
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      router.push('/jobs');
    },
  });

  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='p-8 rounded shadow-md bg-card'
        >
          <h2 className='capitalize font-semibold text-4xl mb-6 text-primary'>Add Job</h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start mb-8'>
            {/* position */}
            <CustomFormField name='position' control={form.control} />
            {/* company */}
            <CustomFormField name='company' control={form.control} />
            {/* location */}
            <CustomFormField name='location' control={form.control} />

            {/* job status */}
            <CustomFormSelect
              name='status'
              control={form.control}
              labelText='job status'
              items={Object.values(JobStatus)}
            />
            {/* job  type */}
            <CustomFormSelect
              name='mode'
              control={form.control}
              labelText='job mode'
              items={Object.values(JobMode)}
            />

            <Button 
              type='submit' 
              className='self-end capitalize w-full md:w-auto mt-4 md:mt-0'
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Job'}
            </Button>
          </div>
        </form>
      </Form>
      {ToastComponent}
    </>
  );
}
export default CreateJobForm;