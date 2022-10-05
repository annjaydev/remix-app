import colors from '@/helpers/theme/colors';

const styles = {
  actionButton: {
    border: `1px solid ${colors.border.main}`,
    bgcolor: colors.background.default
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: `1px solid ${colors.border.main}`,
    borderRadius: '9px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  }
};

export default styles;
