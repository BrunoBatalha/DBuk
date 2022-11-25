import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import { PostHttp } from '../../app/post/post-http';
import { PostDomain } from '../../app/post/PostDomain';
import { Container } from '../../shared/components/container';
import { Post } from '../../shared/components/post';

type Props = {
	postHttp: PostHttp
}

export function Home({ postHttp }: Props) {
	const [posts, setPosts] = useState<PostDomain[]>([])

	useEffect(() => {
		loadPosts()
	}, [])

	async function loadPosts() {
		const postsResponse = await postHttp.list()
		setPosts(postsResponse.list);
	}

	return (
		<Container>
			<FlatList
				style={{ paddingTop: 24 }}
				showsVerticalScrollIndicator={false}
				data={posts}
				// refreshControl
				renderItem={({ item: p }) => (
					<Post
						key={p.id}
						author={p.getUsername()}
						totalComments={100}
						totalReactions={400}
						uriAvatarImage='https://i.vimeocdn.com/portrait/58832_300x300.jpg'
						uriPostImage='https://i.vimeocdn.com/portrait/58832_300x300.jpg'
						datePost={p.getPublishedDateToDisplay()}
					></Post>
				)}
			></FlatList>
		</Container>
	)
}