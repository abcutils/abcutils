export default `select p.twitter_id, p.username, p.name, t1.type, t1.text, t1.created_at from (
select e.user_id, e.type, concat("liked your tweet: ", t.text) as text, e.created_at
from tbl_engagements e join tbl_tweets t on t.tweet_id = e.tweet_id where e.user_id = '456' and e.tweet_id in (
  select tweet_id from tbl_tweets where user_id = '123' and created_at between now() - interval 30 day and now() )
union
select m.user_id, 'reply' as type, concat("replied your tweet: ", m.text) as text, m.created_at from tbl_mentions m where in_reply_to_user_id = '456' and user_id = '123'
) t1
join tbl_profiles p on p.twitter_id = t1.user_id order by created_at desc;`