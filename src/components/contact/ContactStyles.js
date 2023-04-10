import styled from 'styled-components';
import Button from '../../styles/globalComponents/Button';

export const ContactForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const Input = styled.input`
	width: 100%;
	padding: 1.5rem;
	border-radius: 0.5rem;
	border-bottom-left-radius:0;
	border-bottom-right-radius:0;
	background: transparent;
	border: none;
	outline: none;
	resize: none;
	border-bottom: 2px solid rgba(242, 245, 247, 0.3);
	color: ${(props) => props.theme.colors.primary1};

	&:focus{
		border-bottom: 2px solid rgba(242, 245, 247, 1);
	}
	
`;
export const TextArea = styled.textarea`
	width: 100%;
	padding: 1.5rem;
	border-radius: 0.5rem;
	background: transparent;
	border: none;
	outline: none;
	border: 2px solid rgba(242, 245, 247, 0.3);
	color: ${(props) => props.theme.colors.primary1};

	&:focus{
		border: 2px solid rgba(242, 245, 247, 1);
	}
`;
