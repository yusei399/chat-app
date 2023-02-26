import {
	Box,
	Button,
	Center,
	chakra,
	Container,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Input,
	Spacer,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

export const Page = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try
		{
			const auth = getAuth()
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)
			await sendEmailVerification(userCredential.user)
			setEmail('')
			setPassword('')
		}catch(error)
		{
			if (error instanceof FirebaseError)
			{
				console.log(error)
			}
		}
	}

	return (
		<Container py={14}>
			<Heading>サインアップ</Heading>
			<chakra.form onSubmit={handleSubmit}>
				<Spacer h={8} aria-hidden />
				<Grid gap={4}>
					<Box>
						<FormControl>
							<FormLabel>メールアドレス</FormLabel>
							<Input 
							type={'email'}
							name={'email'}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>パスワード</FormLabel>
							<Input 
							type={'password'}
							name={'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
					</Box>
				</Grid>
				<Spacer h={8} aria-hidden />
				<Center>
					<Button type={'submit'}>サインアップ</Button>
				</Center>
			</chakra.form>
		</Container>
	)
}


export default Page