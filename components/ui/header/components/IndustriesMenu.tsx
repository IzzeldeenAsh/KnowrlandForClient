import Link from "next/link";
import { IconChevronDown } from '@tabler/icons-react';
import { HoverCard, Group, Text, Anchor, Divider, SimpleGrid, Button } from '@mantine/core';
import { useIndustries } from '@/hooks/industries';

export function IndustriesMenu() {
  const { industries } = useIndustries();

  return (
    <HoverCard width={'100%'} position="bottom" radius="sm" shadow="md" withinPortal>
      <HoverCard.Target>
        <button className="font-medium text-sm text-gray-600 hover:text-gray-900 mx-4 lg:mx-5 transition duration-150 ease-in-out flex items-center">
          <span className="mr-1">Industries</span>
          <IconChevronDown size={16} />
        </button>
      </HoverCard.Target>

      <HoverCard.Dropdown style={{ background: 'white', borderColor: '#e5e7eb' }}>
        <Group justify="space-between" px="md">
          <Text fw={600} c="dark" size="sm">Featured Industries</Text>
          <Anchor href="/all-industries" fz="xs" c="blue">
            View all industries
          </Anchor>
        </Group>

        <Divider my="sm" />

        <SimpleGrid cols={3} spacing={0}>
          {industries.map((industry) => (
            <Link 
              key={industry.id} 
              href={`/industry/${industry.id}/${industry.slug}`}
              className="block"
            >
              <div className="p-3 rounded transition-colors hover:bg-gray-50">
                <Group wrap="nowrap" align="flex-start">
                  <div>
                    <Text size="sm" fw={500} c="dark">
                      {industry.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Explore insights and trends
                    </Text>
                  </div>
                </Group>
              </div>
            </Link>
          ))}
        </SimpleGrid>

        <div className="mt-4 p-4 rounded-lg bg-gray-50">
          <Group justify="space-between">
            <div>
              <Text fw={500} fz="sm" c="dark">
                Explore All Industries
              </Text>
              <Text size="xs" c="dimmed">
                Discover comprehensive insights across various sectors
              </Text>
            </div>
            <Button 
              variant="light" 
              component={Link} 
              href="/all-industries"
              className="bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              Browse All
            </Button>
          </Group>
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
