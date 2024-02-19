import stylex from "@stylexjs/stylex";
import { styles } from '@/app/styles/my-info'

interface Props {
    points: number;
    likes: number;
}

const MyResult = ({points, likes}: Props) => {
    return (
        <div {...stylex.props(styles.scoreDiv())}>
            <div {...stylex.props(styles.score())}>
                <span {...stylex.props(styles.cat())}>포인트</span>
                <span {...stylex.props(styles.point())}>{points}</span>
            </div>
            <div {...stylex.props(styles.score())}>
                <span {...stylex.props(styles.cat())}>좋아요</span>
                <span {...stylex.props(styles.point())}>{likes}</span>
            </div>
        </div>
    )
};

export default MyResult;