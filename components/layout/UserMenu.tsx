// components/layout/UserMenu.tsx
// Avatar (Clerk's menu) + the user's name, or email if there's no name.
"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function UserMenu() {
  // useUser() gives the logged-in user in client components.
  // isLoaded = false for a moment while Clerk starts.
  const { user, isLoaded } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  // fullName is null if the user never entered a name → fall back to email
  const label = user?.fullName || email;

  return (
    // min-w-0 + truncate: long emails get "..." instead of breaking the sidebar
    <div className="flex min-w-0 items-center gap-2">
      <UserButton />
      {isLoaded && label && (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{label}</p>
          {/* Show the email under the name only when there IS a name */}
          {user?.fullName && email && (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          )}
        </div>
      )}
    </div>
  );
}