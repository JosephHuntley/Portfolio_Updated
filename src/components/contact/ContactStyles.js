import styled from 'styled-components';
import Button from '../../styles/globalComponents/Button';

export const ContactForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

export const Input = styled.input`
	width: 100%;
	padding: 1.5rem;
	border-radius: 0.5rem;
	background: transparent;
	border: 2px solid ${(props) => props.theme.colors.primary1};
	color: ${(props) => props.theme.colors.primary1};
	resize: none;
`;
export const TextArea = styled.textarea`
	width: 100%;
	padding: 1.5rem;
	border-radius: 0.5rem;
	background: transparent;
	border: 2px solid ${(props) => props.theme.colors.primary1};
	color: ${(props) => props.theme.colors.primary1};
`;
