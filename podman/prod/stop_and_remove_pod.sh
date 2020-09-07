CTR_LIST="biodex_mob_nginx-prod-ctr biodex_mob_redis-prod-ctr biodex_mob_api-prod-ctr biodex_mob_db-prod-ctr biodex_mob_celery-prod-ctr"
echo "attempting to stop containers"
for CTR in $CTR_LIST; do
    podman stop $CTR
done

echo "attempting to remove containers"
for CTR in $CTR_LIST; do
    podman rm $CTR;
done

echo "stopping pod"
podman pod stop biodex_mob
echo "removing pod"
podman pod rm biodex_mob
