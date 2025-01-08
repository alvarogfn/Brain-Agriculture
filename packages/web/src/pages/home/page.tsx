import { Link, Outlet } from 'react-router';

import { Box } from '@/components/box';
import { useTranslation } from '@/i18n';

function HomePage() {
  const { t } = useTranslation();

  return (
    <Box display="flex" h="100vh" w="100vw">
      <Box
        as="nav"
        borderRight="1px solid black"
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        gap="5"
        p="2"
      >
        <Link to="/dashboard">{t('generalResume')}</Link>
        <br />
        <Link to="/farmer">{t('farmers')}</Link>
        <Link to="/farmer/create">{t('farmerRegistration')}</Link>
        <br />
        <Link to="/farm/create">{t('farmRegistration')}</Link>
        <Link to="/harvest/create">{t('harvestRegistration')}</Link>
        <Link to="/crop/create">{t('cropRegistration')}</Link>
      </Box>

      <Box flexGrow="1">
        <Outlet />
      </Box>
    </Box>
  );
}

export default HomePage;
