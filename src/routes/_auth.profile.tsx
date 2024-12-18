import { createFileRoute } from '@tanstack/react-router'

import { ProfilePage } from '@/pages/profile'
import { PageLoader } from '@/shared/ui'
import { sleep } from '@/shared/lib'

export const Route = createFileRoute('/_auth/profile')({
  component: ProfilePage,
  pendingComponent: PageLoader,
  loader: async () => {
    await sleep(500)

    return {
      userLogin: localStorage.getItem('login'),
    }
  },
})
