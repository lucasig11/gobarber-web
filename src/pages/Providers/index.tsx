import React from 'react';

// import api from '../../services/apiClient';
import Header from '../../components/Header';

// import { useAuth } from '../../hooks/auth';
// import { usePopup } from '../../hooks/popup';
import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
	// const { user, signOut } = useAuth();
	// const { openPopup } = usePopup();
	// States
	// const [isLoading, setLoading] = useState(false);

	return (
		<>
			<Container>
				<Header />
				<Content />
			</Container>
		</>
	);
};

export default Dashboard;
