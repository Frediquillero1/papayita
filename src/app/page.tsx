import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className='p-4'>
      <div className='flex flex-col gap-y-4'>
        <div>
          <h1 className='text-2xl text-rose-700 underline font-bold'>Home page</h1>
        </div>
        <div>
          <Button variant='elevated'>I am a button</Button>
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea value='I am a textarea' />
        </div>
      </div>
    </div>
  );
}
