import { Box, LinearProgress } from '@mui/material';
import { PostDomain } from 'domain/entities';
import { AlertDefault } from 'presentation/components/alert-default/alert-default';
import { useAlert } from 'presentation/hooks/useAlert';
import { usePagination } from 'presentation/hooks/usePagination';
import { IReactPostUseCase } from 'presentation/interfaces/usecases/IReactPostUseCase';
import { IShowTimelineUseCase } from 'presentation/interfaces/usecases/IShowTimelineUseCase';
import { Post } from 'presentation/views/timeline/components/post/post';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// https://www.npmjs.com/package/react-dynamic-virtual-scroll
type Props = {
  showTimelineUseCase: IShowTimelineUseCase;
  reactPostUseCase: IReactPostUseCase;
};

export function Timeline({ showTimelineUseCase, reactPostUseCase }: Props) {
  const [posts, setPosts] = useState<PostDomain[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { alert, setAlert } = useAlert();
  const pagination = usePagination({ initialPage: 0, itemsPerPage: 5 });

  async function listPosts({ page, initialPosts }: { page: number; initialPosts: PostDomain[] }) {
    const {
      list,
      pagination: { total }
    } = await showTimelineUseCase.execute(page, pagination.perPage);
    pagination.setTotal(total);

    setPosts([...initialPosts, ...list]);
  }

  async function onReactPost(postId: number) {
    await reactPostUseCase.execute({ postId: postId });

    const postIndex = posts.findIndex((p) => p.id === postId);

    setPosts((oldPosts) =>
      oldPosts.map((p, i) => {
        if (i !== postIndex) {
          return p;
        }

        if (p.isReacted) {
          p.amountReactions--;
          p.isReacted = false;
        } else {
          p.amountReactions++;
          p.isReacted = true;
        }

        return p;
      })
    );
  }

  useEffect(() => {
    if (posts.length === 0) {
      listPosts({ page: 0, initialPosts: posts })
        .catch(() => setAlert({ isOpen: true, message: 'connection_failed', type: 'error' }))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (pagination.page !== 0) {
      listPosts({ page: pagination.page, initialPosts: posts });
    }
  }, [pagination.page]);

  return (
    <div id="scrollable" style={{ maxHeight: 670, overflow: 'auto' }} data-testid="container-posts">
      {isLoading && <LinearProgress />}

      <AlertDefault
        isOpen={alert.isOpen}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />

      <InfiniteScroll
        dataLength={posts.length}
        next={pagination.nextPage}
        hasMore={posts.length < pagination.total}
        loader={<LinearProgress />}
        scrollableTarget="scrollable"
        scrollThreshold={0.9}
      >
        {posts.map((p) => (
          <Box key={p.id} sx={{ marginTop: (theme) => theme.spacing(4) }} data-testid="section-post">
            <Post post={p} onReactPost={onReactPost} />
          </Box>
        ))}
      </InfiniteScroll>
    </div>
  );
}
