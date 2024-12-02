import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';
import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../app/i18n/client";

interface UserButtonProps {

}

const UserButton: FC<UserButtonProps> = ({  }) => {
    const { data: session, status } = useSession();
    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar radius="xl" style={{ cursor: 'pointer' }} name={session?.user.name ?? ''} key={session?.user.name ?? ''} color="initials" />
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {session?.user.name ?? ''}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {session?.user.email}
                    </Text>
                </div>
                <IconChevronRight size={14} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}

export default UserButton;